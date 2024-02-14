import { Flex, FlexDirection, type FlexProps } from '../Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = (props: VStackProps) => {
   return <Flex {...props} direction={FlexDirection.COLUMN} />;
};
