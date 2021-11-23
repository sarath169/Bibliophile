import React from "react";

function SocialShare() {
  const uri = "https://www.mindfiresolutions.com/";
  const absoluteURI = encodeURI(uri);
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
      <a href={facebookShare}> Facebook </a>
      <br />
      <br />
      <a href={twitterShare}>Twitter </a>
      <br />
      <br />

      <a href={whatsappShare}> Whatsapp </a>
      <br />
      <br />
      <a href={linkedinShare}> Linkedin </a>
    </div>
  );
}

export default SocialShare;
