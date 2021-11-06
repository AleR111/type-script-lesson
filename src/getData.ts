interface UserData {
  userName: string,
  avatarUrl: string
}

export const setLocalStorage = (): void => {
  const userData: UserData = {
    userName: 'Wade Warren',
    avatarUrl: '/img/avatar.png'
  }

  const userDataJSON = JSON.stringify(userData)
  localStorage.setItem('user', userDataJSON);
  // localStorage.setItem('favoritesAmount', '3')
};

export const  getUserData = (): unknown => {
  const userDataJSON = localStorage.getItem('user')
  return JSON.parse(userDataJSON)
}

export const  getFavoritesAmount = (): unknown => {
  const favoritesAmountJSON = localStorage.getItem('favoritesAmount')
  return JSON.parse(favoritesAmountJSON)
}

export const isUserData = (obj: unknown): obj is UserData => {
  return typeof obj === 'object'
                && 'userName' in obj
                && 'avatarUrl' in obj
}
