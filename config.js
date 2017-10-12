module.exports = {
  devicePilotUser: 'DevicePilot', // username of devicepilot slack intergration
  specifications: {
    // specification for parsing notification message time/device/type:
    // {
    //  regex: regular expression to extract,
    //  match: (= 1 by default), group index to return,
    //  none: (= undefined by default), value to return on no match
    // }
    time: { regex: /Alert @(\d\d?\/\d\d?\/\d\d\d\d, \d\d?:\d\d?:\d\d? \w\w)/ },
    device: { regex: /Device: +\((\w*)\)/ },
    type: { regex: 'Event (Flagged|Cleared)' },
  },
};
