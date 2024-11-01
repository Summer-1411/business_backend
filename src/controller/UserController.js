const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/VerifyToken');
const userService = require('../service/UserService');

// Pagination for active users
router.get("/page", userService.getActiveUserPages);
router.get("/pageDeleted", userService.getDeletedUserPages);

// Count deleted users
router.get("/count/deleted", verifyTokenAndAdmin, userService.countDeletedUsers);

// Search users
router.get("/search", userService.searchUsers);

// Fetch all users or paginated users
router.get("/alluser/", verifyTokenAndAdmin, userService.getAllUsers);

// Fetch all deleted users or paginated deleted users
router.get("/deleted/", verifyTokenAndAdmin, userService.getDeletedUsers);

// Update user info
router.put("/update/:id", verifyTokenAndAuthorization, userService.updateUser);

// Delete user (soft delete)
router.put("/delete/:id", verifyTokenAndAdmin, userService.deleteUser);

// Restore deleted user
router.put("/cancel-delete/:id", verifyTokenAndAdmin, userService.restoreUser);

module.exports = router;
