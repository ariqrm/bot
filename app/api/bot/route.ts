export const dynamic = 'force-dynamic'

export const fetchCache = 'force-no-store'

import {Bot, webhookCallback} from 'grammy'

const token = process.env.TELEGRAM_BOT_TOKEN

if (!token)
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

const bot = new Bot(token)
const sendMsgToGroup = async (msg: string) => {
  const splitmsg = msg?.split(',')
  const groupId = splitmsg
    .find(fn => fn.match(/\^ID:/))
    ?.replace('ID:', '')
    .trim()
  const newmsg = splitmsg
    .find(fn => fn.match(/\^MSG:/))
    ?.replace('MSG:', '')
    .trim()
  if (groupId && newmsg) {
    await bot.api.sendMessage(groupId, newmsg)
  }
}
bot.on('message:text', async ctx => {
  if (ctx.message.text) {
    await sendMsgToGroup(ctx.message.text)
    await ctx.reply('You Send It : ' + ctx.message.text)
  } else {
    await ctx.reply(ctx.message.text)
  }
})

export const POST = webhookCallback(bot, 'std/http')
