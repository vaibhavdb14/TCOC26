System design for Notification 

# Approach Used

I fetch all notifications from the API and store them in an array.

Then I assign priority values:

- Placement = 3
- Result = 2
- Event = 1

After that, I sort the array based on:
1. Higher priority first
2. Newer timestamp first if priorities are same

Finally, I use:
slice(0, 10)

to get the top 10 notifications.

#
