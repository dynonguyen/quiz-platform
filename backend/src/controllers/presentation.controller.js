const { MAX } = require('~/constant');
const DEFAULTS = require('~/constant/default');
const { generateUniqueString } = require('~/helper');
const service = require('~/services/presentation.service');

exports.getMyPresentation = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) throw new Error('User not found');
    const presentationList =
      (await service.getPresentationByUserId(userId)) || [];
    return res.status(200).json(presentationList);
  } catch (error) {
    console.log('getMyPresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.getCheckCode = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(200).json({ isExist: false });
    const isExist = await service.checkPresentationExistByCode(code);
    return res.status(200).json({ isExist });
  } catch (error) {
    console.log('getCheckCode ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.getPresentationByCode = async (req, res) => {
  try {
    const { code, userid } = req.query;
    if (!code) {
      throw new Error('code not found');
    }

    // userId can be undefined if user is not logged in
    console.log(userid);
    // TODO: Handle logic
    // Kiểm tra người dùng = owner của presentation thì trả về dòng bên dưới
    // Nếu userId không có hoặc user != owner thì chỉ trả về những gì cần thiết cho MemberView

    const presentation = await service.getPresentationByCode(code);
    if (userid === presentation.owner._id.toString()) {
      return res.status(200).json(presentation.toObject());
    } else {
      const slides = presentation.slides.map(
        (slide) =>
          (slide = {
            id: slide.id,
            question: slide.question,
            desc: slide.desc,
            options: slide.options.map((option) => {
              return {
                value: option.value,
                order: option.order,
              };
            }),
            answers: slide.answers,
            settings: slide.settings,
          }),
      );
      const result = {
        _id: presentation._id,
        name: presentation.name,
        code: presentation.code,
        slides: slides,
        currentSlide: presentation.currentSlide,
      };
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log('getPresentationByCode ERROR: ', error);
    return res.status(400).json({ msg: 'presentation not found' });
  }
};

exports.deletePresentation = async (req, res) => {
  try {
    const { presentationId } = req.params;
    const delRes = await service.deletePresentationById(presentationId);
    if (delRes) {
      return res.status(200).json({ msg: 'success' });
    }
    throw new Error('Delete failed');
  } catch (error) {
    console.log('deletePresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.postNewPresentation = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const { userId } = req.user;

    let code = generateUniqueString(MAX.PRESENTATION_CODE);
    let count = 0;
    while (count <= 10) {
      const isExist = await service.checkPresentationExistByCode(code);
      if (isExist) {
        count++;
        code = generateUniqueString(MAX.PRESENTATION_CODE);
      } else break;
    }

    const newPresentation = await service.createNewPresentation({
      name,
      desc,
      code,
      owner: userId,
      slides: [DEFAULTS.SLIDE()],
    });
    if (newPresentation) {
      return res.status(201).json({ msg: 'Success' });
    }

    return res.status(400).json({ msg: 'Failed' });
  } catch (error) {
    console.log('postNewPresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.putUpdatePresentation = async (req, res) => {
  try {
    const { query, fields } = req.body;
    const { userId } = req.user;
    if (fields.updateAnswers) {
      const isAnswer = await service.getAnswerOfUser(
        query,
        fields.userId,
        fields.slideId,
      );
      delete fields.updateAnswers;
      delete fields.slideId;
      delete fields.userId;
      if (isAnswer.length !== 0)
        return res.status(409).json({ msg: 'Bạn đã trả lời câu này' });
    } else {
      const isExist = await service.checkPresentationExistByQuery({
        ...query,
        owner: userId,
      });
      if (!isExist) return res.status(403).json({ msg: 'No permission' });
    }

    await service.updatePresentation(query, fields);

    return res.status(200).json({ msg: 'Success' });
  } catch (error) {
    console.log('updatePresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.checkUserAnswered = async (req, res) => {
  try {
    const { presentationId, slideId, userId } = req.params;
    const isExist = await service.getAnswerOfUser(
      { presentationId },
      userId,
      slideId,
    );
    if (isExist.length === 0) {
      return res.status(200).json({ answered: false });
    } else {
      return res.status(200).json({ answered: true });
    }
  } catch (error) {
    console.log('updatePresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
