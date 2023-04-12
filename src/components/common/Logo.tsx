import Typography from "@mui/material/Typography";

import { CC_APP_NAME } from "../../config/params";

export const Logo = () => (
    <Typography
        variant="h2"
        color="primary"
        width="100%"
        textAlign="center"
        fontWeight="bold"
        sx={{
            textStroke: '2px #fff',
            'WebkitTextStroke': '2px #fff',
        }}
    >
        {CC_APP_NAME}
    </Typography>
);

export default Logo;
