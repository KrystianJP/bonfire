import { Link, useParams } from "react-router-dom";

function ChannelsBar({ toggleChannelModal, groups, channels }) {
  const { channelId } = useParams();
  return (
    <div className="channels-bar friends-bar">
      {groups.map((group) => {
        return (
          <div className="channel-group" key={group}>
            <div className="channel-group-name-container">
              <h4 className="channel-group-name">{group.toUpperCase()}</h4>
              <span
                className="material-icons"
                onClick={(e) => toggleChannelModal(e, group)}
              >
                add
              </span>
            </div>
            {channels
              .filter((channel) => channel.channel_group === group)
              .map((channel) => {
                return (
                  <Link
                    to={
                      channel.type === "text" ? `/servers/1/${channel.id}` : "#"
                    }
                    className={
                      "channel" + (channelId == channel.id ? " highlight" : "")
                    }
                    key={channel.id}
                  >
                    <span className="material-icons">
                      {channel.voice ? "volume_up" : "tag"}
                    </span>
                    <span className="channel-name">{channel.name}</span>
                  </Link>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default ChannelsBar;
