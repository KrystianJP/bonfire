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

  function sortGroups(groups) {
    return [...groups].sort((a, b) => a.groupnr - b.groupnr);
  }

  function sortChannels(channelList) {
    return [...channelList].sort((a, b) => a.channelnr - b.channelnr);
  }

  function sortChannelsByGroup(channelList, groups = channelGroups) {
    const groupOrder = new Map(groups.map((group) => [group.id, group.groupnr]));

    return [...channelList].sort((a, b) => {
      const groupDiff =
        (groupOrder.get(a.channel_group) ?? 0) -
        (groupOrder.get(b.channel_group) ?? 0);

      if (groupDiff !== 0) {
        return groupDiff;
      }

      return a.channelnr - b.channelnr;
    });
  }

  function buildGroupsWithChannels(groups = channelGroups, channelList = channels) {
    return sortGroups(groups).map((group) => ({
      ...group,
      channels: sortChannels(
        channelList
          .filter((channel) => channel.channel_group === group.id)
          .map((channel) => ({ ...channel })),
      ),
    }));
  }

  function flattenGroups(groups) {
    return groups.flatMap((group, groupIndex) =>
      group.channels.map((channel, channelIndex) => ({
        channel,
        groupIndex,
        channelIndex,
      })),
    );
  }

  function saveVisualChannelOrder(nextGroups) {
    const movedChannels = nextGroups.flatMap((group) =>
      group.channels.map((channel, index) => ({
        ...channel,
        channel_group: group.id,
        channelnr: index,
      })),
    );

    const movedChannelIds = new Set(movedChannels.map((channel) => channel.id));
    const untouchedChannels = channels.filter(
      (channel) => !movedChannelIds.has(channel.id),
    );

    setState(
      setChannels,
      sortChannelsByGroup([...untouchedChannels, ...movedChannels]),
    );
  }

  function disableChangingName() {
    setChangingChannelName(-1);
    setChangingGroup(-1);
  }

  useEffect(() => {
    setGroupsWithChannels(buildGroupsWithChannels());
  }, [channels, channelGroups]);

  function addChannel(name, voice, group) {
    let groupIndex = groupsWithChannels.findIndex(
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
  function deleteChannel(channelid) {
    deletedChannels.current.push(channelid);
    setState(
      setChannels,
      channels.filter((c) => c.id !== channelid),
    );
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

  function moveChannel(channelId, direction) {
    const tempGroups = buildGroupsWithChannels();
    const groupIndex = tempGroups.findIndex((group) =>
      group.channels.some((channel) => channel.id === channelId),
    );

    if (groupIndex === -1) {
      return;
    }

    const channelIndex = tempGroups[groupIndex].channels.findIndex(
      (channel) => channel.id === channelId,
    );

    if (direction < 0) {
      if (channelIndex > 0) {
        const channels = tempGroups[groupIndex].channels;
        [channels[channelIndex - 1], channels[channelIndex]] = [
          channels[channelIndex],
          channels[channelIndex - 1],
        ];
      } else if (groupIndex > 0) {
        const [movedChannel] = tempGroups[groupIndex].channels.splice(
          channelIndex,
          1,
        );
        tempGroups[groupIndex - 1].channels.push(movedChannel);
      } else {
        return;
      }
    }

    if (direction > 0) {
      if (channelIndex < tempGroups[groupIndex].channels.length - 1) {
        const channels = tempGroups[groupIndex].channels;
        [channels[channelIndex], channels[channelIndex + 1]] = [
          channels[channelIndex + 1],
          channels[channelIndex],
        ];
      } else if (groupIndex < tempGroups.length - 1) {
        const [movedChannel] = tempGroups[groupIndex].channels.splice(
          channelIndex,
          1,
        );
        tempGroups[groupIndex + 1].channels.unshift(movedChannel);
      } else {
        return;
      }
    }

    saveVisualChannelOrder(tempGroups);
    disableChangingName();
  }

  function checkFirstChannel(channelId) {
    const flattenedChannels = flattenGroups(groupsWithChannels);
    return flattenedChannels[0]?.channel.id === channelId;
  }

  function checkLastChannel(channelId) {
    const flattenedChannels = flattenGroups(groupsWithChannels);
    return (
      flattenedChannels[flattenedChannels.length - 1]?.channel.id === channelId
    );
  }

  function moveGroupUp(groupnr) {
    let index = channelGroups.findIndex((group) => group.groupnr === groupnr);
    let groupsCopy = [...channelGroups];
    let newGroupNr = groupsCopy[index - 1].groupnr;
    let temp = groupsCopy[index];
    groupsCopy[index] = groupsCopy[index - 1];
    groupsCopy[index - 1] = temp;
    groupsCopy[index - 1] = { ...groupsCopy[index - 1], groupnr };
    groupsCopy[index] = { ...groupsCopy[index], groupnr: newGroupNr };
    setState(setChannelGroups, sortGroups(groupsCopy));
    disableChangingName(-1);
  }
  function moveGroupDown(groupnr) {
    let index = channelGroups.findIndex((group) => group.groupnr === groupnr);
    let groupsCopy = [...channelGroups];
    let newGroupNr = groupsCopy[index + 1].groupnr;
    let temp = groupsCopy[index];
    groupsCopy[index] = groupsCopy[index + 1];
    groupsCopy[index + 1] = temp;
    groupsCopy[index + 1] = { ...groupsCopy[index + 1], groupnr };
    groupsCopy[index] = { ...groupsCopy[index], groupnr: newGroupNr };
    setState(setChannelGroups, sortGroups(groupsCopy));
    disableChangingName(-1);
  }

  return (
    <div className="channels-page settings-content">
      <h1>Channels</h1>

      <button className="create-role" onClick={addGroup}>
        New Group
      </button>

      {sortGroups(channelGroups).map((group) => {
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
                  {group.groupnr !== sortGroups(channelGroups)[0].groupnr && (
                    <span
                      className="material-icons"
                      onClick={() => moveGroupUp(group.groupnr)}
                    >
                      expand_less
                    </span>
                  )}

                  {group.groupnr !==
                    sortGroups(channelGroups)[channelGroups.length - 1]
                      .groupnr && (
                    <span
                      className="material-icons"
                      onClick={() => moveGroupDown(group.groupnr)}
                      style={{
                        marginLeft:
                          group.groupnr === sortGroups(channelGroups)[0].groupnr
                            ? 24
                            : 0,
                      }}
                    >
                      expand_more
                    </span>
                  )}
                </span>
              </span>
            </div>

            {groupsWithChannels.length === channelGroups.length &&
              groupsWithChannels
                .filter((g) => g.id === group.id)[0]
                .channels.map((channel) => {
                  return (
                    <div className="channel" key={channel.id}>
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
                                r.id === channel.id
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
                        <span
                          className="material-icons delete-button"
                          onClick={() => deleteChannel(channel.id)}
                        >
                          delete
                        </span>
                        <span
                          className="arrows-container"
                          style={{ marginRight: "15px" }}
                        >
                          {!checkFirstChannel(channel.id) && (
                            <span
                              className="material-icons"
                              onClick={() => moveChannel(channel.id, -1)}
                            >
                              arrow_upward
                            </span>
                          )}
                          {!checkLastChannel(channel.id) && (
                            <span
                              className="material-icons"
                              onClick={() => moveChannel(channel.id, 1)}
                              style={{
                                marginLeft: !checkFirstChannel(channel.id)
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
