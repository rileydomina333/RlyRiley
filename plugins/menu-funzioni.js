// memu funzioni by Bonzino

import fs from 'fs'
import fetch from 'node-fetch'

function stato(value) {
  return value ? '🟢 *𝐀𝐭𝐭𝐢𝐯𝐨*' : '⚪ *𝐃𝐢𝐬𝐚𝐭𝐭𝐢𝐯𝐨*'
}

let handler = async (m, { conn, usedPrefix }) => {
  const chat = global.db?.data?.chats?.[m.chat] || {}
  const bot = global.db?.data?.settings?.[conn.user.jid] || {}

  let pp = null
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image')
  } catch {}

  let thumbnail = null

  try {
    if (pp) {
      const res = await fetch(pp)

      if (res.ok) {
        thumbnail = Buffer.from(await res.arrayBuffer())
      }
    }
  } catch {}

  if (!thumbnail) {
    try {
      thumbnail = fs.readFileSync('./media/default-avatar.png')
    } catch {}
  }

  const text = `╭━━━━━━━⚙️━━━━━━━╮
*✦ 𝐀𝐗𝐈𝐎𝐍 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈 ✦*
╰━━━━━━━⚙️━━━━━━━╯

*🛡️ "Anti Link": !!chat?.antiLink,
        "Anti Link Hard": !!chat?.antiLinkHard,
        "Anti Spam": !!chat?.antispam,
        "Anti Trava": !!chat?.antitrava,
        "Benvenuto": !!chat?.welcome,
        "Addio": !!chat?.bye,
        "Anti Bestemmie": !!chat?.antibestemmie,
        "Solo Admin": !!chat?.soloadmin,
        "Anti Porno": !!chat?.antiporno,
        "Anti Call": !!chat?.antiCall,
        "Anti Virus": !!chat?.antivirus,
        "Anti Bot": !!chat?.antibot,
        "Anti Media": !!chat?.antimedia,
        "Anti TikTok": !!chat?.antitiktok,
        "Anti Gore": !!chat?.antigore,       
        "Anti Nuke": !!chat?.antinuke

  await conn.sendMessage(
    m.chat,
    {
      text,
      footer: '𝛥𝐗𝐈𝚶𝐍 𝚩𝚯𝐓',
      buttons: [
        {
          buttonId: `${usedPrefix}menu`,
          buttonText: {
            displayText: '⬅️ Menu Principale'
          },
          type: 1
        }
      ],
      headerType: 1,
      contextInfo: {
        ...(global.rcanal?.contextInfo || {}),
        ...(thumbnail
          ? {
              externalAdReply: {
                title: '𝐀𝐗𝐈𝐎𝐍 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈',
                body: 'Stato moduli del sistema',
                thumbnail,
                mediaType: 1,
                renderLargerThumbnail: false,
                showAdAttribution: false
              }
            }
          : {})
      }
    },
    { quoted: m }
  )
}

handler.help = ['funzioni']
handler.tags = ['group']
handler.command = /^(funzioni|statusfunzioni|moduli)$/i

export default handler
