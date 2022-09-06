import { Field } from "@antmjs/vantui";
import { ITouchEvent, View } from "@tarojs/components";
import "./index.less";

interface IProps {
  remarks: string;
  onChangeRemarks: (e: ITouchEvent) => void;
  onInput: (item: string | number) => void;
  onDelete: () => void;
  onSubmit: () => void;
}
export default function RemarkInput(props: IProps) {
  const { remarks, onChangeRemarks, onInput, onDelete, onSubmit } = props;
  return (
    <View className="add-bill-remark-input_wrap">
      <Field
        value={remarks}
        className="remark_input"
        placeholder="备注"
        border={false}
        onChange={onChangeRemarks}
      />
      <View className="number-key-board_wrap">
        <View className="number-key-board_left">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "关闭"].map((item) => {
            return (
              <View
                key={item}
                className="number-key-board_item"
                onClick={() => {
                  onInput(item);
                }}
              >
                {item}
              </View>
            );
          })}
        </View>
        <View className="number-key-board_right">
          <View
            className="number-key-board_del"
            onClick={() => {
              onDelete();
            }}
          >
            x
          </View>
          <View className="number-key-board_confirm" onClick={onSubmit}>
            确定
          </View>
        </View>
      </View>
    </View>
  );
}
