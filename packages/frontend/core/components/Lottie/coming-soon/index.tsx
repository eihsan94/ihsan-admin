import { Box, BoxProps } from "@chakra-ui/react";
import RenderLottie from "../RenderLottie";
import comingSoonAnimation from "./coming-soon.json";

export default function ComingSoonLottie(props: BoxProps) {
    const style = {
        height: 300,
    };

    return (
        <RenderLottie style={style} animationData={comingSoonAnimation} />
    )

}
