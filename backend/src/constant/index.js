exports.BASE_URL = '/api/v1';
exports.APP_NAME = 'Quiz Platform';

exports.ACCOUNT_TYPES = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

exports.JWT_EXPIRES_TIME = 7 * 24 * 3600; // 7 days (by sec)

exports.KEYS = {
  JWT_TOKEN: 'accessToken',
};

exports.MAX = {
  SIZE_JSON_REQUEST: '25mb',
  EMAIL_LEN: 100,
  PASSWORD_LEN: 40,
  NAME_LEN: 50,
  USER_NAME: 110,
  VERIFY_TIME: 10 * 60 * 1000, // 10 minutes
  GROUP_NAME: 100,
  GROUP_DESC: 250,
  GROUP_CODE: 10,

  PRESENTATION_NAME: 100,
  PRESENTATION_DESC: 150,
  PRESENTATION_CODE: 10,
  SLIDE_NAME: 150,
  SLIDE_DESC: 250,
};

exports.MIN = {
  PASSWORD_LEN: 6,
};

exports.GROUP_ROLES = {
  OWNER: 'owner',
  CO_OWNER: 'co-owner',
  MEMBER: 'member',
};

exports.CHART_TYPES = {
  BAR: 'bar',
  DONUT: 'doughnut',
  PIE: 'pie',
};

exports.SLIDE_TYPES = {
  MULTIPLE_CHOICE: 'multiple',
};
