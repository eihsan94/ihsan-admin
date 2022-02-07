import { ImageProps, Image } from '@chakra-ui/react';
import Img from '@components/Img';

interface Props extends ImageProps {
}

const Logo: React.FC<Props> = (props) => {
	return (
		<Img
			objectFit={"contain"}
			{...props}
			src={'/images/dogo.png'}
			alt="dogo.png"
			placeholder="blur"
		/>
	);
};

export default Logo;
