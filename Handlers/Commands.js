const { Perms } = require("../Validation/Permission");
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { r } = require("tar");

/**
 * @param {Client} client
 */

module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return Table.addRow(file.split("/")[7], "🔶 FAILED", "Missing a name.")
        
        if (!command.description)
            return Table.addRow(command.name, "🔶 FAILED", "Missing a description.")
        
        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(command.name, "🔶 FAILED", "Permission is invalid.")
        }
        
        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "🔷 SUCCESSFUL");
    });

    console.log(Table.toString());

    // PERMISSIONS CHECK //

    client.on("ready", async () => {
        const MainGuild = await client.guilds.cache.get("367656645947293696");
        const SubGuild1 = await client.guilds.cache.get("745671352207540234");
        const SubGuild2 = await client.guilds.cache.get("431545257176334356");
        const SubGuild3 = await client.guilds.cache.get("337223129783074816");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return MainGuild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permission = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permission: true }]
                }, []);

                return [...accumulator, { id: r.id, remove: true }]
            }, []);

            await MainGuild.commands.permissions.set({ fullPermissions });


        });

        SubGuild1.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return SubGuild1.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permission = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permission: true }]
                }, []);

                return [...accumulator, { id: r.id, remove: true }]
            }, []);

            await SubGuild1.commands.permissions.set({ fullPermissions });


        });

        SubGuild2.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return SubGuild2.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permission = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permission: true }]
                }, []);

                return [...accumulator, { id: r.id, remove: true }]
            }, []);

            await SubGuild2.commands.permissions.set({ fullPermissions });


        });

        SubGuild3.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (!cmdPerms) return null;

                return SubGuild3.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if (!roles) return accumulator;

                const permission = roles.reduce((a, r) => {
                    return [...a, { id: r.id, type: "ROLE", permission: true }]
                }, []);

                return [...accumulator, { id: r.id, remove: true }]
            }, []);

            await SubGuild3.commands.permissions.set({ fullPermissions });


        });
    });
}