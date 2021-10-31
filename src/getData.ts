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
  localStorage.setItem('favoritesAmount', '3')
};

