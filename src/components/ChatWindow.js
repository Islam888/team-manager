import React, { Component } from "react";
import firebase from "firebase";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./img/him.jpg";
const styles = theme => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "100%",
    maxHeight: "60vh",
    overflowY: "auto",
    paddingBottom: 0,
    backgroundColor: theme.palette.background.paper
  },

  inline: {
    display: "inline"
  },
  greenAvatar: {
    background: "green",
    color: "red"
  },
  blueAvatar: {
    background: "blue",
    color: "green"
  },
  yellowAvatar: {
    background: "yellow",
    color: "green"
  },
  textField: {
    width: "100%",
    marginTop: 0
  },
  card: {
    width: "100%",
    maxHeight: "calc(100vh - 105px)",
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  listItemText: {
    whiteSpace: "pre-wrap"
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
    display: "block",
  },
  message: {
    fontWeight: "600",
    padding: 3,
    borderRadius: 3,
    display: "inline-block",
    color: "#222"

  },

});

class ChatWindow extends Component {
  componentDidMount() {
    const ChatList = document.getElementById('list')
    ChatList.scrollTop = 10000
  }
  componentDidUpdate() {
    const ChatList = document.getElementById('list')
    ChatList.scrollTop = 10000
  }
  handleSendBtnClick = () => {
    const messageInputElement = document.getElementById("message-textField");
    this.props.sendMessage(messageInputElement.value, messageInputElement);
  };

  handleChange = e => {
    this.props.handleChange(e.target.value);
  };

  handleKeyUp = e => {
    this.props.handleKeyUp(e.target.value);
  };
  
  handleKeyDown = e => {
    console.log('pressed')
	  this.props.handleKeyDown(e)
  }

  setBackground = (name, currentUser) => {
    if (name === currentUser.name) {
      //return "#ffe6f7"
	  return "#ffb3e7"
    } else {
		//return "#e6f7ff"
		return "#b3e7ff"
	}
  }

  render() {
    const { classes, messages, currentUser } = this.props;
    return (
      <div className={classes.wrapper}>
        <Card className={classes.card}>
          <CardContent>
            <CardHeader title="Team Chat"></CardHeader>
            <List id="list" className={classes.root}>
              {messages.map(msg => (
                <div key={msg.timestamp} className={classes.listDiv}>
                  <ListItem alignItems="flex-start" className={classes.listItem} >
                    <ListItemAvatar>
                      <Avatar src={msg.profilePicUrl} />
                    </ListItemAvatar>
                    <ListItemText 
                    className={classes.listItemText} 
                    primary={msg.name} 
                    secondary={msg.text}
                    primaryTypographyProps={{className: classes.userName}}
                    secondaryTypographyProps={{className: classes.message, style:{background: this.setBackground(msg.name, currentUser)}}}
                     />
                  </ListItem>
                </div>
              ))}
            </List>
            <TextField
              id="message-textField"
              label="message..."
              /* placeholder="message.." */
              multiline
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange}
              onKeyUp={this.handleKeyUp}
			        onKeyDown={this.handleKeyDown}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      id="submit-btn"
                      onClick={this.handleSendBtnClick}
                      disabled={this.props.btnDisableStatus}
                    >
                      <Send />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ChatWindow);
