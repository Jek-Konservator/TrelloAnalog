import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  buttonLogin: {
      background: "#2196f3",
      '&:hover': {
          background: "#32BDF8FF"},
    border: 0,
    borderRadius: "15px",
    boxShadow: "0 3px 5px 2px",
    color: "white",
    width: "370px",
    height: "45px",
  },

  textFieldLogin: {
    width: "350px",
    marginBottom: "40px",
  },
  formGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 10px 0 10px",
  },
  linkLogin: {
    textDecoration: "none",
    fontSize: "18px",
    color: "#2196f3"
  },

  cardLogin: {
    padding: "0 0 20px 0",
    width: "540px",
    height: "512px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "15px",
  },
});

export default useStyles;
