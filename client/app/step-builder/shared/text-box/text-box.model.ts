export class TextBox {
  id: string;
  label: string;
  desc: {
    basic: string;
    detailed: string;
  }
  itemType: string;
  itemProperties: {
    dataType: string,
    mandatory: boolean,
    val?: string | {};
  }
}
