import { useEffect, useState } from "react";
import ChannelCreationModal from "../ChannelCreationModal";

function Channels({
  channels,
  channelGroups,
  setChannels,
  setChannelGroups,
  setState,
  deletedChannels,
  deletedGroups,
  token,
  serverId,
}) {
  const [changingChannelName, setChangingChannelName] = useState(-1);
  const [changingGroup, setChangingGroup] = useState(-1);
  const [nameValue, setNameValue] = useState("");
  const [groupsWithChannels, setGroupsWithChannels] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalGroup, setModalGroup] = useState({});

  function disableChangingName() {
    setChangingChannelName(-1);
    setChangingGroup(-1);
  }

  useEffect(() => {
    let tempGroups = [...channelGroups];
    tempGroups.forEach((group) => {
      group.channels = [];

      channels.forEach((channel) => {
        if (channel.channel_group === group.id) {
          group.channels.push(channel);
        }
      });
    });

    setGroupsWithChannels(tempGroups);
  }, [channels, channelGroups]);

  function addChannel(name, voice, group) {
    let groupIndex = channelGroups.findIndex(
      (channelGroup) => channelGroup.id === group.id,
    );
    // add 1 to last channel's channelnr in group
    let channelnr;
    if (groupsWithChannels[groupIndex].channels.length > 0) {
      channelnr =
        groupsWithChannels[groupIndex].channels[
          groupsWithChannels[groupIndex].channels.length - 1
        ].channelnr + 1;
    } else {
      channelnr = 0;
    }

    const newChannel = {
      name,
      voice,
      serverid: serverId,
      channel_group: group.id,
      channelnr,
    };

    fetch("/api/servers/channel/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newChannel),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.channel);
        setChannels([...channels, data.channel]);
      })
      .catch((err) => console.log(err));
  }

  function addGroup() {
    let groupnr = channelGroups[channelGroups.length - 1].groupnr + 1;

    const newGroup = { name: "New Group", groupnr };

    fetch("/api/servers/channel_group/" + serverId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newGroup),
    })
      .then((res) => res.json())
      .then((data) => {
        setChannelGroups([...channelGroups, data.group]);
      })
      .catch((err) => console.log(err));
  }

  function deleteGroup(groupid) {
    setState(
      setChannelGroups,
      channelGroups.filter((group) => group.id !== groupid),
    );
    deletedGroups.current.push(groupid);
  }

  function updateChannels(group) {
    let tempChannels = [...channels];

    tempChannels.map((channel) => {
      let channelFromGroup =
        group.channels.find((c) => c.id === channel.id) || -1;

      if (channelFromGroup !== -1) {
        channel.channelnr = channelFromGroup.channelnr;
        channel.channel_group = group.id;
      }
      return channel;
    });

    setState(
      setChannels,
      tempChannels.sort((a, b) => a.channelnr - b.channelnr),
    );
  }

  // moving up from first group should be blocked
  function moveChannelUp(channelnr, groupnr) {
    let groupIndex = groupsWithChannels.findIndex(
      (group) => group.groupnr === groupnr,
    );
    let channelIndex = groupsWithChannels[groupIndex].channels.findIndex(
      (channel) => channel.channelnr === channelnr,
    );

    let tempGroups = groupsWithChannels.map((group) => ({
      ...group,
      channels: [...group.channels], // Deep copy channels
    }));

    if (channelIndex === 0) {
      let newGroupLength = tempGroups[groupIndex - 1].channels.length;

      let newChannelNr =
        newGroupLength > 0
          ? tempGroups[groupIndex - 1].channels[newGroupLength - 1].channelnr +
            1
          : 0;

      tempGroups[groupIndex].channels[0].channelnr = newChannelNr;

      tempGroups[groupIndex - 1].channels.push(
        tempGroups[groupIndex].channels.shift(),
      );

      updateChannels(tempGroups[groupIndex - 1]);
    } else {
      let newChannelNr =
        tempGroups[groupIndex].channels[channelIndex - 1].channelnr;

      let temp = tempGroups[groupIndex].channels[channelIndex];
      tempGroups[groupIndex].channels[channelIndex] =
        tempGroups[groupIndex].channels[channelIndex - 1];
      tempGroups[groupIndex].channels[channelIndex - 1] = temp;

      tempGroups[groupIndex].channels[channelIndex - 1].channelnr =
        newChannelNr;
      tempGroups[groupIndex].channels[channelIndex].channelnr = channelnr;

      updateChannels(tempGroups[groupIndex]);
    }

    disableChangingName();
  }

  // moving down from last group should be blocked
  function moveChannelDown(channelnr, groupnr) {
    let groupIndex = groupsWithChannels.findIndex(
      (group) => group.groupnr === groupnr,
    );
    let channelIndex = groupsWithChannels[groupIndex].channels.findIndex(
      (channel) => channel.channelnr === channelnr,
    );

    let tempGroups = groupsWithChannels.map((group) => ({
      ...group,
      channels: [...group.channels], // Deep copy channels
    }));

    if (channelIndex === groupsWithChannels[groupIndex].channels.length - 1) {
      let newChannelNr =
        tempGroups[groupIndex + 1].channels.length > 0
          ? tempGroups[groupIndex + 1].channels[0].channelnr
          : 0;
      tempGroups[groupIndex + 1].channels.map(
        (channel) => (channel.channelnr += 1),
      );

      tempGroups[groupIndex + 1].channels.unshift(
        tempGroups[groupIndex].channels.pop(),
      );

      if (tempGroups[groupIndex].channels.length > 0) {
        tempGroups[groupIndex].channels[0].channelnr = newChannelNr;
      }

      updateChannels(tempGroups[groupIndex + 1]);
    } else {
      let newChannelNr =
        tempGroups[groupIndex].channels[channelIndex + 1].channelnr;
      let temp = tempGroups[groupIndex].channels[channelIndex];
      tempGroups[groupIndex].channels[channelIndex] =
        tempGroups[groupIndex].channels[channelIndex + 1];
      tempGroups[groupIndex].channels[channelIndex + 1] = temp;

      tempGroups[groupIndex].channels[channelIndex + 1].channelnr =
        newChannelNr;
      tempGroups[groupIndex].channels[channelIndex].channelnr = channelnr;

      updateChannels(tempGroups[groupIndex]);
    }

    disableChangingName();
  }

  function checkFirstChannel(channelnr, groupnr) {
    let groupIndex = channelGroups.findIndex(
      (group) => group.groupnr === groupnr,
    );
    let channelIndex = groupsWithChannels[groupIndex].channels.findIndex(
      (channel) => channel.channelnr === channelnr,
    );

    if (channelIndex === 0 && groupIndex === 0) {
      return true;
    }
    return false;
  }

  function checkLastChannel(channelnr, groupnr) {
    let groupIndex = channelGroups.findIndex(
      (group) => group.groupnr === groupnr,
    );
    let channelIndex = groupsWithChannels[groupIndex].channels.findIndex(
      (channel) => channel.channelnr === channelnr,
    );

    if (
      channelIndex === groupsWithChannels[groupIndex].channels.length - 1 &&
      groupIndex === channelGroups.length - 1
    ) {
      return true;
    }
    return false;
  }

  return (
    <div className="channels-page settings-content">
      <h1>Channels</h1>

      <button className="create-role" onClick={addGroup}>
        New Group
      </button>

      {channelGroups.map((group) => {
        return (
          <div className="channel-group" key={group.groupnr}>
            <div className="channel-group-name-container">
              {changingGroup !== group.id ? (
                <div className="friend-left">
                  <h4 className="channel-group-name">
                    {group.name.toUpperCase()}
                  </h4>
                  <span
                    className="material-icons edit-icon"
                    onClick={() => {
                      setChangingGroup(group.id);
                      setNameValue(group.name);
                    }}
                  >
                    edit
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setState(
                      setChannelGroups,
                      channelGroups.map((r) =>
                        r.groupnr === group.groupnr
                          ? { ...r, name: nameValue }
                          : r,
                      ),
                    );
                    disableChangingName();
                  }}
                  className="username-container"
                >
                  <input
                    type="text"
                    className="search-bar"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                  <span
                    className="material-icons edit-icon"
                    onClick={() => {
                      disableChangingName();
                      setNameValue(group.name);
                    }}
                  >
                    close
                  </span>
                </form>
              )}

              <span className="friend-icons">
                <span
                  className="material-icons"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(true);
                    setModalGroup(group);
                  }}
                >
                  add
                </span>
                <span
                  className="material-icons"
                  onClick={() => deleteGroup(group.id)}
                >
                  delete
                </span>
                <span className="arrows-container">
                  <span className="material-icons">arrow_upward</span>
                  <span className="material-icons">arrow_downward</span>
                </span>
              </span>
            </div>

            {groupsWithChannels.length === channelGroups.length &&
              groupsWithChannels
                .filter((g) => g.id === group.id)[0]
                .channels.map((channel) => {
                  return (
                    <div className="channel" key={channels.indexOf(channel)}>
                      {changingChannelName !== channel.id ? (
                        <div className="friend-left">
                          <span className="material-icons">
                            {channel.voice ? "volume_up" : "tag"}
                          </span>
                          <span className="channel-name">{channel.name}</span>
                          <span
                            className="material-icons edit-icon"
                            onClick={() => {
                              setChangingChannelName(channel.id);
                              setNameValue(channel.name);
                            }}
                          >
                            edit
                          </span>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setState(
                              setChannels,
                              channels.map((r) =>
                                r.channelnr === channel.channelnr
                                  ? { ...r, name: nameValue }
                                  : r,
                              ),
                            );
                            disableChangingName();
                          }}
                          className="username-container"
                        >
                          <input
                            type="text"
                            className="search-bar"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                          />
                          <span
                            className="material-icons edit-icon"
                            onClick={() => {
                              disableChangingName();
                              setNameValue(channel.name);
                            }}
                          >
                            close
                          </span>
                        </form>
                      )}
                      <span className="friend-icons">
                        <span className="material-icons">delete</span>
                        <span
                          className="arrows-container"
                          style={{ marginRight: "15px" }}
                        >
                          {!checkFirstChannel(
                            channel.channelnr,
                            group.groupnr,
                          ) && (
                            <span
                              className="material-icons"
                              onClick={() =>
                                moveChannelUp(channel.channelnr, group.groupnr)
                              }
                            >
                              arrow_upward
                            </span>
                          )}
                          {!checkLastChannel(
                            channel.channelnr,
                            group.groupnr,
                            channel.id,
                          ) && (
                            <span
                              className="material-icons"
                              onClick={() =>
                                moveChannelDown(
                                  channel.channelnr,
                                  group.groupnr,
                                )
                              }
                              style={{
                                marginLeft: !checkFirstChannel(
                                  channel.channelnr,
                                  group.groupnr,
                                )
                                  ? "0px"
                                  : "24px",
                              }}
                            >
                              arrow_downward
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  );
                })}
          </div>
        );
      })}

      {modalOpen && (
        <ChannelCreationModal
          addChannel={addChannel}
          setModalOpen={setModalOpen}
          group={modalGroup}
        />
      )}
    </div>
  );
}

export default Channels;
