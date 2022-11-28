import Chat from "../components/Chat";
import NavigationAllChats from "../components/NavigationAllChats";

function Index() {
  return (
    <div>
      <NavigationAllChats />
      <Chat
        name="Business Mann 42"
        img="https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_700,h_700/https://www.corporatephotographerslondon.com/wp-content/uploads/2021/06/professional-LinkedIn-profile-photo-London-1.jpg"
        text="Zeit ist Geld, komm zum Punkt!"
        time="Gestern"
      />
    </div>
  );
}

export default Index;
