# MongoDB Initialization Guide - Skills Network

## Step-by-Step Instructions

### 1. Open Skills Network Toolbox
- Locate and open the **Skills Network Toolbox** in your lab environment

### 2. Create MongoDB Instance
- Navigate to the **Databases** category
- Select **MongoDB**
- Click the **Create** button to initialize the database service
- Wait 2-3 minutes for the database to start

### 3. Collect Connection Information
Once the database is running, copy the following connection details from the **Connection Information** tab:

```
MONGO_HOST: [Copy from Skills Network]
MONGO_PORT: [Copy from Skills Network]
MONGO_PASSWORD: [Copy from Skills Network]
```

### 4. ⚠️ IMPORTANT - Take Screenshot
**YOU MUST TAKE A SCREENSHOT OF THE TERMINAL OUTPUT showing:**
- MongoDB successfully running
- Connection information visible
- Save this screenshot with a clear filename like: `mongodb-initialization-screenshot.png`
- Store it in an easily accessible location (Desktop or Documents folder)
- **You will need this screenshot for your final project submission!**

### 5. Store Connection Details
After copying the connection information, you'll need to add it to your project's `.env` file in the next step.

## Connection String Format
Your MongoDB connection string will look like this:
```
mongodb://admin:[MONGO_PASSWORD]@[MONGO_HOST]:[MONGO_PORT]/giftlink?authSource=admin
```

## Notes
⚠️ **Important:**
- The lab environment is temporary
- Password and Host ID will be different each time you start MongoDB
- Always copy the current connection information when working in the lab
- Keep your screenshot safe for final project submission

## Next Steps
After initialization, proceed to configure your application's `.env` file with these credentials.
