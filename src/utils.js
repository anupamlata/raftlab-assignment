import { FriendNode } from "./friendnode.class";

export const calculateDegreeOfSeparation = (friendList, friendNodeA, friendNodeB) => {
  const myGraph = [];

  //Create the graph
  friendList.forEach((user) => {
    user.name = new FriendNode(user.name);
    user.friends.forEach((friend) => {
      user.name.addFriend(friend);
    });
    myGraph.push(user.name);
  });

  const findNodeByName = (name) => {
    return myGraph.filter((elm) => elm.name === name)[0];
  };

  const findPath = (a, b) => {
    console.log("🚀 ~ file: utils.js:33 ~ findPath ~ a, b:", a, b)
    //Print what nodes we are looking to find a path for
    // console.log(`Searching path from ${a.name} to ${b.name}`);

    //Creating our queue with the starting node
    const queue = [a];

    while (queue.length > 0) {
      //If the active node equals our target. We are done. Add the node name to the node path and print the path.
      if (queue[0] === b) {
        queue[0].path.push(queue[0].name);
        return queue[0].path;
      } else {
        //Otherwise for each friends of the active node...
        queue[0].friends.forEach((friend) => {
          const friendObj = findNodeByName(friend);

          //If the friend hasn't been checked yet...
          if (!friendObj.checked) {
            //Add to the friend its own path from the start
            friendObj.pushedBy(queue[0]);
            //Mark the friend as check
            friendObj.isChecked();
            //Add the friend to the queue
            queue.push(friendObj);
          }
        });

        //Remove the active node from the queue
        queue.shift();
      }
    }
  };

  return findPath(findNodeByName(friendNodeA), findNodeByName(friendNodeB));
}

export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const getUniqueName = (personList, personName) => personList.map(p=>p.name).indexOf(personName) > -1 ? (personName + getRandomInt(300)) : personName;