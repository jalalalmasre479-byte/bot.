const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");


let ticketNumber = 0;

const OWNER_ID = "1513599894345089117";


module.exports = (client) => {


client.on("messageCreate", async (message)=>{


if(message.author.bot) return;


// الردود

if(message.content === "السلام عليكم"){
message.reply("وعليكم السلام ورحمة الله وبركاته");
}


if(message.content === "باك"){
message.reply("ولكم باك وين غايب");
}


if(message.content === "تست"){
message.reply("ارسل");
}


if(message.content === "."){
message.reply("احلا من ينقط");
}



// لوحة التكت

if(message.content === "تكت"){


if(message.author.id !== OWNER_ID){

return message.reply(
"لا يمكنك استخدام هذا الإجراء فأنت لست مصري"
);

}



const menu = new StringSelectMenuBuilder()

.setCustomId("ticket_panel")

.setPlaceholder("🎫 اضغط لفتح تذكرة")

.addOptions([

{
label:"فتح تذكرة",
value:"open"
}

]);



const row = new ActionRowBuilder()

.addComponents(menu);



message.channel.send({

content:
"🎫 تذكرة السيرفر\nيرجى الضغط على الزر وسيتواصل معك إداري بأقرب وقت",

components:[row]

});

}


});




// التفاعلات


client.on("interactionCreate", async(interaction)=>{


if(!interaction.isStringSelectMenu()) return;



// فتح التكت


if(interaction.customId === "ticket_panel"){


if(interaction.values[0] === "open"){


ticketNumber++;



const channel =
await interaction.guild.channels.create({


name:`🎫-${ticketNumber}`,


type:ChannelType.GuildText,


permissionOverwrites:[


{

id:interaction.guild.id,

deny:[
PermissionFlagsBits.ViewChannel
]

},



{

id:interaction.user.id,

allow:[

PermissionFlagsBits.ViewChannel,

PermissionFlagsBits.SendMessages

]

}


]


});





const controlMenu = new StringSelectMenuBuilder()

.setCustomId("ticket_control")

.setPlaceholder("🎫 اختر إجراء التذكرة")

.addOptions([


{
label:"إضافة عضو",
value:"add"
},


{
label:"إخراج عضو",
value:"remove"
},


{
label:"تغيير اسم التذكرة",
value:"rename"
},


{
label:"قفل التذكرة",
value:"close"
},


{
label:"استلام التذكرة",
value:"claim"
},


{
label:"إعادة اختيار",
value:"again"
}


]);





const row = new ActionRowBuilder()

.addComponents(controlMenu);



channel.send({

content:
`🎫 تم فتح التذكرة رقم ${ticketNumber}`,

components:[row]

});



interaction.reply({

content:
`✅ تم فتح تذكرة ${channel}`,

ephemeral:true

});



}


}




// أوامر داخل التكت


if(interaction.customId === "ticket_control"){



const option = interaction.values[0];



if(option === "claim"){

interaction.reply(
`🎫 تم استلام التذكرة بواسطة ${interaction.user}`
);

}



if(option === "close"){


interaction.reply(
`🔒 تم قفل التذكرة بواسطة ${interaction.user}`
);


interaction.channel.permissionOverwrites.edit(

interaction.guild.id,

{

ViewChannel:false

}

);


}



if(option === "again"){


interaction.reply({

content:"🎫 تم إعادة الاختيار",

ephemeral:true

});


}



}


});


};
