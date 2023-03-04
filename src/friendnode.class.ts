export class FriendNode {
  name: string;
  friends: string[] = [];
  path: string[] = [];
  checked: boolean = false;

  constructor(name: string) {
    this.name = name;
    this.friends = [];
    this.checked = false;
    this.path = [];
  }

  addFriend = (friend: string) => {
    this.friends.push(friend);
  };

  isChecked = () => {
    this.checked = true;
  };

  pushedBy = (parent: any) => {
    this.path = [...parent.path];
    this.path.push(parent.name);
  };
}