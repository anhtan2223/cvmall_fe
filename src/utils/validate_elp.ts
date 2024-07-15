import tl from '@/utils/locallize'

export default {
  required: (rule: any, value: any, callback: any) => {
    if (value === '' || value === null || value === undefined || value.length === 0) {
      callback(new Error(tl('Common', 'ValidateFieldRequied', [rule.label ? rule.field : rule.label])))
    } else {
      callback()
    }
  },
  requiredRadioRule: (value: any, name: string) => {
    return value !== null || tl('Common', 'ValidateFieldRequied', [name])
  },
  minLengthRule: (value: any, name: string, min: number) => {
    return (
      value?.length >= min || tl('Common', 'ValidateMinLength', [name, min])
    )
  },
  maxLengthRule: (rule: any, value: any, callback: any) => {
    if (value && value.length > rule.max) {
      callback(new Error(tl('Common', 'ValidateMaxLength', [rule.label ? rule.field : rule.label, `${rule.max}`])))
    } else {
      callback()
    }
  },
  lengthRule: (value: any, name: string, length: number) => {
    return (
      value?.length === length || tl('Common', 'ValidateLength', [name, length])
    )
  },
  emailRule: (rule: any, value: any, callback: any) => {
    if (!value) callback()

    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    ) {
      callback()
    } else {
      callback(new Error(tl('Common', 'Email không hợp lệ', [rule.label ? rule.field : rule.label])))
    }
  },
  dateRule: (rule: any, value: any, callback: any) => {
    if (!value) callback()
    // 2021-01-30
    if (
      /^([12]\d{3})[-](((0[13456789]|1[0-2])[-](0[1-9]|[12][0-9]|3[01]))|02[-](0[1-9]|[12][0-9]))$/.test(value)
    ) {
      callback()
    } else {
      callback(new Error(tl('Common', 'ValidateInvalid', [rule.label ? rule.field : rule.label])))
    }
  },
  phoneNumberRule: (rule: any, value: any, callback: any) => {
    if (!value) callback()

    if (/^[+0-9][./0-9]{8,19}$/.test(value)) {
      callback()
    } else {
      callback(new Error(tl('Common', 'Số điện thoại không hợp lệ', [rule.label ? rule.field : rule.label])))
    }
  },
  checkPassword: (value: any, newVal: any, name: string) => {
    return value === newVal || tl('User', 'OtherPassWord', [name, length])
  },
  checkSamePassword: (value: any, newVal: any, name: string) => {
    return value === newVal || tl('User', 'OtherPassWord', [name, length])
  },
  alphabetAndSymbolRule: (rule: any, value: any, callback: any) => {
    if (value === '' || value === null) {
      callback()
    }
    if (!/^[a-zA-Z0-9`~!@#/$%/^/&*/)/(+=._-]+$/g.test(value)) {
      callback(
        new Error(
          '文字数（a ～ A、0 ～ 9）及び特殊文字のみを入力してください：~!@#$%^&*)(+=._-'
        )
      )
    } else {
      callback()
    }
  },
  amountValidator: (rule: any, value: any, callback: any) => {
    const numericValue = parseFloat(value)
    const regex = /^\d{0,15}$/
    if (!isNaN(numericValue) && regex.test(value)) {
      callback()
    } else {
      callback(new Error(tl('Common', 'ValidateAmountInvalid', [rule.label ? rule.field : rule.label])))
    }
  },
  amountNegativeValidator: (rule: any, value: any, callback: any) => {
    const numericValue = parseFloat(value)
    const regex = /^-?\d{0,15}$/
    if (!isNaN(numericValue) && regex.test(value)) {
      callback()
    } else {
      callback(new Error('金額は 15 桁以内で入力してください'))
    }
  },
  inputSpaceValidator: (rule: any, value: any, callback: any) => {
    const hasNonWhitespaceCharacter: boolean = /\S/.test(value)

    if (!hasNonWhitespaceCharacter) {
      callback(new Error('値にはスペースを含めることはできません'))
    } else {
      callback()
    }
  },
  numberValidator: (rule: any, value: any, callback: any) => {
    const regex = /^\d*$/
    if (regex.test(value) || !value) {
      callback()
    } else {
      callback(new Error('Vui lòng chỉ nhập số'))
    }
  },
  sortOrderValidator: (rule: any, value: any, callback: any) => {
    const numericValue = parseFloat(value)
    const regex = /^-?\d{0,10}$/
    if (!isNaN(numericValue) && regex.test(value)) {
      callback()
    } else {
      callback(new Error('金額は 10 桁以内で入力してください'))
    }
  },
  numberWithPrefix: (prefix: any) => {
    return (rule: any, value: any, callback: any) => {
      const regex = new RegExp(`^${prefix}\\d{4}$`);
      if (regex.test(value) || !value) {
        callback();
      } else {
        callback(new Error(`Định dạng không hợp lệ`));
      }
    };
  }
}
