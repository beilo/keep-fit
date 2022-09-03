interface ICategoryFindParams {
  /**
   * 类别ID
   */
  categoryId?: number;
  /**
   * 类别类型，1: 系统类别, 2:普通类别
   */
  categoryType?: number;
}

interface ICategoryFind {
  /**
   * 类别ID
   */
  categoryId: number;
  /**
   * 类别名称
   */
  categoryName: string;
  /**
   * 类别类型，1: 系统类别, 2:普通类别
   */
  categoryType: number;
}
