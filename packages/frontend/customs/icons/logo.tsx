import { ImageProps, Image } from '@chakra-ui/react';
import Img from '@components/Img';

interface Props extends ImageProps {
}

const Logo: React.FC<Props> = (props) => {
	return (
		<Img
			objectFit={"contain"}
			{...props}
			src={'/images/dogo.webp'}
			alt="dogo.webp"
			placeholder="blur"
		/>
	);
};

export default Logo;
