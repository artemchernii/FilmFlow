import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    // backgroundColor: '#FFDEE9',
    // backgroundImage: 'linear-gradient(333deg, #FFDEE9 0%, #B5FFFC 100%)',
  },
  backgourndGrad: {
    background: "linear-gradient(to right, #fffcdc, #d9a7c7)",
  },
  toolbar: {
    height: "80px",
  },
  content: {
    flexGrow: "1",
    width: "100%",
    padding: "2em",
  },
}));
