import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  buttonLogin: {
    background: "#2196f3",
    "&:hover": {
      background: "#32BDF8FF",
    },
    border: 0,
    borderRadius: "15px",
    boxShadow: "0 3px 5px 2px",
    color: "white",
    width: "370px",
    height: "45px",
  },
  buttonMain: {
    background: "#2196f3",
    "&:hover": {
      background: "#32BDF8FF",
    },
    border: 0,
    borderRadius: "15px",
    boxShadow: "0 3px 5px 2px",
    color: "white",
    width: "150px",
    height: "35px",
  },
  textFieldLogin: {
    width: "350px",
    marginBottom: "40px",
  },
  formGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  alertLogin: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "18px",
    color: "#2196f3",
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
  cardMain: {
    width: "350px",
    height: "250px",
    margin: "0 0 15px 15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "15px",
    fontSize: "20px",
  },
  cardTask: {
    backgroundColor: "white",
    opacity: "0.8",
    width: "350px",
    overflow: "hidden",
    minHeight: "150px",
    maxHeight: "250px",
    margin: "10px",
    borderRadius: "30%",
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word",
  },
  listMenuBoards: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useStyles;
