export type Devices =
   | 'mobile'
   | 'mobileL'
   | 'pad'
   | 'notebook'
   | 'desktop'
   | '';
export type Position = 'vertical' | 'horizontal' | '';

export type DevicesPosition = {
   device: Devices;
   position: Position;
};
