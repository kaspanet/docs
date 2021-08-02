# Eclipse and DoS

* The address manager doesn't take into consideration any kind of eclipse attack. We should probably apply some
  measurements against it (we can take Bitcoin core as an example).
* p2p ID can be faked, so you can use an ID of someone else, and everyone you connect with won't connect with the victim
  because of the no dobule-connections rule.