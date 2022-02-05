import {
    Image,
    ImageProps,
} from '@chakra-ui/react';

interface ImgProps extends ImageProps {
    src: string
}

const Img = (props: ImgProps) => {
    const { src } = props
    return (
        <Image
            fallbackSrc={src}
            alt={src}
            {...props}
        />
    )
}

export default Img

