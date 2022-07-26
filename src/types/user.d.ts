/**
 * 账本成员
 */
interface IUser {
  /**
   * 用户ID
   */
  userId: number;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 邮箱
   */
  email: null | string;
  /**
   * 电话
   */
  phone: null | string;
  /**
   * token
   */
  token: string;
}

/**
 * 账单参与者模型
 */
interface IBillUser {
  /**
   * 金额
   */
  amount: number;
  /**
   * 用户ID
   */
  userId: number;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 参与份额
   */
  copiesNumber: number;
  /**
   * 头像
   */
  avatarUrl: string;
}
