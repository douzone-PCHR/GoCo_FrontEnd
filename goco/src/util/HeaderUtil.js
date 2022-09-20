export const status = (data) => {
  let result = '';
  switch (data) {
    case '0':
      result = '미출근';
      break;
    case '1':
      result = '지각';
      break;
    case '2':
      result = '근무중';
      break;
    case '3':
      result = '휴가';
      break;
    case '4':
      result = '출장';
      break;
    case '5':
      result = '퇴근';
      break;
    default:
      break;
  }
  return result;
};

export const modeChange = (urlValue, setUrlValue, authority, setCheck, check) => {
  if (authority === 'ROLE_MANAGER') {
    setCheck(true);
    switch (urlValue) {
      case 'approveteam':
        setUrlValue('approveteam');
        localStorage.setItem('modeChange', '1');
        break;
      case 'manager':
        setUrlValue('manager');
        localStorage.setItem('modeChange', '1');
        break;
      case 'goco':
        setUrlValue('goco');
        localStorage.setItem('modeChange', '0');
        break;
      case 'approve':
        setUrlValue('approve');
        localStorage.setItem('modeChange', '0');
        break;
      case 'board':
        setUrlValue('board');
        localStorage.setItem('modeChange', '0');
        break;
      default:
        localStorage.setItem('modeChange', '0');
        break;
    }
  } else if (authority === 'ROLE_ADMIN') {
    setCheck(true);
    switch (urlValue) {
      case 'admin':
        setUrlValue('admin');
        localStorage.setItem('modeChange', '3');
        break;
      case 'management':
        setUrlValue('management');
        localStorage.setItem('modeChange', '3');
        break;
      default:
        localStorage.setItem('modeChange', '0');
        break;
    }
  } else if (authority === 'ROLE_USER') {
    setCheck(true);
    switch (urlValue) {
      case 'goco':
        setUrlValue('goco');
        localStorage.setItem('modeChange', '0');
        break;
      case 'approve':
        setUrlValue('approve');
        localStorage.setItem('modeChange', '0');
        break;
      case 'board':
        setUrlValue('board');
        localStorage.setItem('modeChange', '0');
        break;
      default:
        break;
    }
  }
};
