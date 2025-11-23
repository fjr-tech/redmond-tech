const cron = require('node-cron');
const db = require('../config/db.js');

console.log(`[Cron] ${__filename} is running!`)

// Runs every hour at minute 0
// Run when: when minute = 0 (0), every hour (*), every day (*), every month (*), every day of the week (*)  
cron.schedule('0 * * * *', async () => {
    try {
        await db.query(`DELETE FROM sessions WHERE expires_at < NOW()`);
        console.log('[Cron] Expired sessions cleaned.');
    } catch (err) {
        console.error('[Cron] Cleanup failed:', err);
    }
});