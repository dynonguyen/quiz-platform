const { getGroupByID } = require('~/services/group.service');

exports.getGroup = async (req, res) => {
  try {
    const groupID = req.params.groupID;
    const group = await getGroupByID(groupID);
    return res.status(200).json(group.toObject());
  } catch (error) {
    console.log('getMembersList ERROR: ', error);
    return res.status(400).json({ msg: 'Failed' });
  }
};
