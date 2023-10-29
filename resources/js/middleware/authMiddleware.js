export default function ({ next, store }) {
    if (!store.getters.isAuthenticated) {
      return next({
        name: 'login', // Redirect to the login page if not authenticated
      });
    }
    return next();
  }
  