import { Link, useParams } from "react-router-dom";

function ChannelsBar({ groups, channels }) {
  const { channelId, serverId } = useParams();
  return (
    <div className="channels-bar friends-bar">
      {groups.map((group) => {
        return (
          <div className="channel-group" key={group.id}>
            <div className="channel-group-name-container">
              <h4 className="channel-group-name">{group.name.toUpperCase()}</h4>
            </div>
            {channels
              .filter((channel) => channel.channel_group === group.id)
              .map((channel) => {
                return (
                  <Link
                    to={
                      !channel.voice
                        ? `/servers/${serverId}/${channel.id}`
                        : "#"
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
