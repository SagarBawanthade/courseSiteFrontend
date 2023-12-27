import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  builder => {
    builder
      .addCase('getAdminStatsRequest', state => {
        state.loading = true;
      })
      .addCase('getAdminStatsSuccess', (state, action) => {
        state.loading = false;
        const {
          stats,
          viewsCount,
          subscriptionCount,
          usersCount,
          subscriptionPercentage,
          viewsPercentage,
          usersPercentage,
          subscriptionProfit,
          viewsProfit,
          usersProfit,
        } = action.payload;
        state.stats = stats;
        state.viewsCount = viewsCount;
        state.subscriptionCount = subscriptionCount;
        state.usersCount = usersCount;
        state.subscriptionPercentage = subscriptionPercentage;
        state.viewsPercentage = viewsPercentage;
        state.usersPercentage = usersPercentage;
        state.subscriptionProfit = subscriptionProfit;
        state.viewsProfit = viewsProfit;
        state.usersProfit = usersProfit;
      })
      .addCase('getAdminStatsFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getAllUsersRequest', state => {
        state.loading = true;
      })
      .addCase('getAllUsersSuccess', (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase('getAllUsersFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('updateUserRoleRequest', state => {
        state.loading = true;
      })
      .addCase('updateUserRoleSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('updateUserRoleFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ... other cases ...
      .addCase('clearError', state => {
        state.error = null;
      })
      .addCase('clearMessage', state => {
        state.message = null;
      });
  }
);
