interface IApiModal<T> {
  /**
   * 成功为0, 失败为其它
   */
  code: number;
  /**
   * 主体数据
   */
  data?: T;
  /**
   * 接口提示
   */
  message: string;
  /**
   * 是否成功
   */
  success: boolean;
}

/**
 * 账本模型
 */
interface ILedger {
  /**
   * 账单创建时间
   */
  createTime: string;
  /**
   * 创建人
   */
  createUserId: number;
  /**
   * 是否删除
   */
  isDel: boolean;
  /**
   * 账本ID
   */
  ledgerId: number;
  /**
   * 成员，成员
   */
  members: IUser[];
  /**
   * 账本名称
   */
  name: string;
  /**
   * 备注
   */
  remarks: string;
  /**
   * 账单更新时间
   */
  updateTime: string;
}

/**
 * 账本查询参数
 */
interface IGetLedgerParams {
  /**
   * 创建人
   */
  createUserId?: number;
  /**
   * 账本ID
   */
  ledgerId?: number;
}

interface ILedgerProfile {
  /**
   * 账单创建时间
   */
  createTime: string;
  /**
   * 创建人
   */
  createUserId: number;
  /**
   * 是否删除
   */
  isDel: number;
  /**
   * 账本ID
   */
  ledgerId: number;
  /**
   * 成员，成员
   */
  members: ILedgerUser[];
  /**
   * 账本名称
   */
  name: string;
  /**
   * 备注
   */
  remarks: null | string;
  /**
   * 总消费，仅限账单概述接口
   */
  totalConsume?: number;
  /**
   * 账单更新时间
   */
  updateTime: string;
  /**
   * 账本邀请码
   */
  ledgerCode: string;
}

interface ILedgerUser {
  /**
   * 个人已消费，仅限账单概述接口
   */
  consume?: number;
  /**
   * 角色,1 创建人, 2 普通成员
   */
  role: number;
  /**
   * 个人盈余，需收款为正数, 需付款为负数; 仅限账单概述接口
   */
  surplus?: number;
  /**
   * 个人已支付，仅限账单概述接口
   */
  totalPayment?: number;
  /**
   * 用户ID
   */
  userId: number;
  /**
   * 用户名
   */
  userName: string;
}

interface ILedgerSettlePlan {
  /**
   * 还款金额
   */
  amount: number;
  /**
   * 还款人
   */
  from: ILedgerSettlePlanUser;
  /**
   * 收款人
   */
  to: ILedgerSettlePlanUser;
}

/**
 * 还款人
 *
 * 账本成员
 *
 * 收款人
 */
interface ILedgerSettlePlanUser {
  /**
   * 头像url
   */
  avatarUrl: null | string;
  /**
   * 个人已消费，仅限账单概述接口
   */
  consume?: number;
  /**
   * 角色,1 创建人, 2 普通成员
   */
  role: number;
  /**
   * 个人盈余，需收款为正数, 需付款为负数; 仅限账单概述接口
   */
  surplus?: number;
  /**
   * 个人已支付，仅限账单概述接口
   */
  totalPayment?: number;
  /**
   * 用户ID
   */
  userId: number;
  /**
   * 用户名
   */
  userName: string;
}
