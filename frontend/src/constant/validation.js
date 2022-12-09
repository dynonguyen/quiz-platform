export const MAX = {
  EMAIL: 150,
  PASSWORD: 40,
  NAME: 50,
  GROUP_NAME: 100,
  GROUP_DESC: 250,
  GROUP_CODE: 10,

  PRESENTATION_NAME: 100,
  PRESENTATION_DESC: 150,
  PRESENTATION_CODE: 15,
  SLIDE_NAME: 150,
  SLIDE_DESC: 250
};

export const MIN = {
  USER_NAME: 4,
  PASSWORD: 6
};

export const REGEX = {
  USER_NAME: /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
  NAME: /^[\w'\-,.ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$/gm
};
