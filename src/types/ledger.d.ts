interface IApiModal<T> {
  /**
   * 成功为0, 失败为其它
   */
  code: number;
  /**
   * 主体数据
   */
  data?: T[];
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
