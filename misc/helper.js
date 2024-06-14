export const darkMode = ['black', '#0a232b', '#0d2e38', '#04363b', '#096973'];
export const lightMode = ['white', '#7af6fa', '#6cdde0', '#6cd6d9', '#5fbfc2'];
export const convertTime = seconds => {
    if(seconds < 60)
    {
      if(seconds < 10) return `00:0${seconds}`;
      return `00:${seconds}`
    }
    if(seconds >= 60 && seconds < 3600)
    {
      const minutes = (seconds - seconds % 60) / 60;
      seconds %= 60;
      if(minutes < 10) 
      {
        if(seconds < 10) return `0${minutes}:0${seconds}`
        return `0${minutes}:${seconds}`
      }
      if(seconds < 10) return `${minutes}:0${seconds}`
      if(seconds > 10) return `${minutes}:${seconds}`
    }
};