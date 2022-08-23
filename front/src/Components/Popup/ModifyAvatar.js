import "./ModifyAvatar.css"

const ModifyAvatar = props => {
  const files = ["avatars/avatar-m1.png", "avatars/avatar-m2.png", "avatars/avatar-m3.png", "avatars/avatar-w1.png", "avatars/avatar-w2.png", "avatars/avatar-w3.png"];

  const choseAvatar = (pos) => {
    props.setNameFile(files[pos]);
  }

  return (
    <div className="popup-box-background">
      <div className="box-popup box-popup-login">
      	<div className="in-box-popup in-box-popup-login">
        	<span className="close-icon-popup close-icon-popup-login" onClick={props.handleCloseAvatars}>x</span>
        	<p class="Title-User-Word">Choose an avatar</p>
          <div>
            {files.map((name, pos) =>
              <button onClick={event => choseAvatar(pos)}><img src={name} alt="avatar" width="125"/></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ModifyAvatar;
