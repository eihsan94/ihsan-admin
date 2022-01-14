import { ImageProps, Image } from '@chakra-ui/react';

interface Props extends ImageProps {
	width: string,
	height: string,
}

const Logo: React.FC<Props> = (props) => {
	const {width, height} = props
	return (
		<Image
			{...props}
			width={width}
			height={height}
			src={'/images/dogo.png'}
			fallbackSrc={'/images/dogo.png'}
			alt="dogo.png"
			placeholder="blur"
		/>
	);
};

export default Logo;
