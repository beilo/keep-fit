interface IBillParams {
  /**
   * 账单ID，不传查所有
   */
  billId?: number;
  /**
   * 账单状态，0:默认状态(未清账), 1:已清账, -1:已删除, 不传查全部
   */
  billState?: number;
  /**
   * 账本ID
   */
  ledgerId: number;
  /**
   * 分页下标，默认0, 从0开始
   */
  pageIndex?: number;
  /**
   * 分页大小，默认10
   */
  pageSize?: number;
}

/**
 * 账单模型
 */
interface IBill {
  /**
   * 账单金额
   */
  billAmount: number;
  /**
   * 账单ID
   */
  billId: number;
  /**
   * 账单状态，0:默认(未清账), 1:已清账, -1:已删除
   */
  billState: number;
  /**
   * 账单消费时间
   */
  billTime: string;
  /**
   * 类别ID
   */
  categoryId: number;
  /**
   * 类别Name
   */
  categoryName: string;
  /**
   * 账单创建时间
   */
  createTime: string;
  /**
   * 账本ID
   */
  ledgerId: number;
  /**
   * 参与人，参与人
   */
  participants: IBillUser[];
  /**
   * 付款人，付款人
   */
  payers: IBillUser[];
  /**
   * 备注
   */
  remarks: string;
  /**
   * 账单更新时间
   */
  updateTime: string;
}
