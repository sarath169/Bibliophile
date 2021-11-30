import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid } from "@material-ui/core";

function SocialShare(props) {
  const uri = props.url;
  // console.log(uri);
  const absoluteURI = encodeURI(uri);
  // console.log(absoluteURI);
  const text = "Visit our company page for more details ";
  const title = "Mindfire Solutions";
  const provider = "sarath";
  const twitterHashtags = "#mindfire,#jobs";
  const facebookShare = `https://www.facebook.com/sharer.php?u=${absoluteURI}`;
  const twitterShare = `http://twitter.com/share?text=${text}&url=${absoluteURI}/&hashtags=${twitterHashtags}"`;
  const whatsappShare = `https://api.whatsapp.com/send?&text=${absoluteURI}`;
  const linkedinShare = `https://www.linkedin.com/shareArticle?url=${absoluteURI}&title=${title}&summary=${text}&source=${provider}
  `;
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <a href={facebookShare} target="_blank" rel="noopener noreferrer">
            {" "}
            <FacebookOutlinedIcon color="primary" />{" "}
          </a>
        </Grid>
        <Grid item xs={1}>
          <a href={twitterShare} target="_blank" rel="noopener noreferrer">
            <TwitterIcon color="primary" />{" "}
          </a>
        </Grid>
        <Grid item xs={1}>
          <a href={whatsappShare} target="_blank" rel="noopener noreferrer">
            {" "}
            <WhatsAppIcon color="success" />{" "}
          </a>
        </Grid>
        <Grid item xs={1}>
          <a href={linkedinShare} target="_blank" rel="noopener noreferrer">
            {" "}
            <LinkedInIcon color="primary" />{" "}
          </a>
        </Grid>
      </Grid>
    </div>
  );
}

export default SocialShare;
