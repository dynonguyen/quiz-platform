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

    const presentation = await service.getPresentationByCode(code);
    const isOwner = userid === presentation.owner._id.toString();

    if (isOwner) {
      return res.status(200).json(presentation.toObject());
    } else {
      const slides = presentation.slides.map(
        (slide) =>
          (slide = {
            id: slide.id,
            question: slide.question,
            type: slide.type,
            desc: slide.desc,
            options: slide.options,
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
        isPresenting: presentation.isPresenting,
        onlineCount: presentation.onlineCount,
        chats: presentation.chats,
        userId: userid ? userid : req.socket.remoteAddress.toString(),
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
    const isExist = await service.checkPresentationExistByQuery({
      ...query,
      owner: userId,
    });
    if (!isExist) return res.status(403).json({ msg: 'No permission' });

    await service.updatePresentation(query, fields);

    return res.status(200).json({ msg: 'Success' });
  } catch (error) {
    console.log('updatePresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};

exports.putUpdateAnswers = async (req, res) => {
  try {
    const { query, fields } = req.body;
    if (fields.updateAnswers) {
      const isAnswer = await service.getAnswerOfUser(
        query,
        fields.userId,
        fields.slideId,
      );
      delete fields.updateAnswers;
      delete fields.slideId;

      if (isAnswer.length !== 0)
        return res.status(409).json({ msg: 'Bạn đã trả lời câu này' });
    } else {
      delete fields.updateChat;
    }
    delete fields.userId;
    await service.updatePresentation(query, fields);

    return res.status(200).json({ msg: 'Success' });
  } catch (error) {
    console.log('updatePresentation ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
