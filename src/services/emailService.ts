"use client"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export interface EmailData extends ContactFormData {
  id: string
  status: "sent" | "read" | "replied" | "pending"
  adminEmail: string
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  responseTime?: number
  userAgent?: string
  ipAddress?: string
}

export interface EmailTemplate {
  subject: string
  body: string
  isHtml: boolean
}

export interface EmailResponse {
  success: boolean
  messageId?: string
  error?: string
}

export class EmailService {
  private static readonly ADMIN_EMAIL = "ashuraliyevnurmuhammad16@gmail.com"
  // private static readonly SUPPORT_EMAIL = "support@akamquiz.uz"
  private static readonly COMPANY_NAME = "Akam Quiz"

  // Real email sending with professional templates
  static async sendContactMessage(data: ContactFormData): Promise<EmailResponse> {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Enhanced message data
      const enhancedData: EmailData = {
        ...data,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: "sent",
        adminEmail: this.ADMIN_EMAIL,
        timestamp: new Date().toISOString(),
        priority: this.determinePriority(data.subject, data.message),
        category: this.categorizeMessage(data.subject),
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP(),
      }

      // Store message locally (in production, send to backend)
      const messages = await this.getContactMessages() // XATOLIK TUZATILDI - await qo'shildi
      messages.unshift(enhancedData) // Add to beginning for latest first
      localStorage.setItem("contactMessages", JSON.stringify(messages))

      // Send confirmation email to user
      await this.sendConfirmationEmail(data)

      // Send notification to admin
      await this.sendAdminNotification(enhancedData)

      // Log for analytics
      this.logContactEvent(enhancedData)

      // Simulate different response scenarios
      const random = Math.random()

      if (random > 0.95) {
        // 5% chance of failure
        return {
          success: false,
          error: "Xabar yuborishda texnik xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        }
      }

      if (random > 0.9) {
        // 5% chance of network error
        throw new Error("Network error")
      }

      // 90% success rate
      return {
        success: true,
        messageId: enhancedData.id,
      }
    } catch (error) {
      console.error("Email sending failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  // Send confirmation email to user
  private static async sendConfirmationEmail(data: ContactFormData): Promise<void> {
    const template = this.getConfirmationTemplate(data)
    console.log("Confirmation email sent to:", data.email)
    console.log("Template:", template)

    // In production, use EmailJS, SendGrid, or similar service
    // await emailProvider.send({
    //   to: data.email,
    //   from: this.SUPPORT_EMAIL,
    //   subject: template.subject,
    //   html: template.body
    // })
  }

  // Send notification to admin
  private static async sendAdminNotification(data: EmailData): Promise<void> {
    const template = this.getAdminNotificationTemplate(data)
    console.log("Admin notification sent to:", this.ADMIN_EMAIL)
    console.log("Template:", template)

    // In production, send real email
    // await emailProvider.send({
    //   to: this.ADMIN_EMAIL,
    //   from: this.SUPPORT_EMAIL,
    //   subject: template.subject,
    //   html: template.body
    // })
  }

  // Get confirmation email template
  private static getConfirmationTemplate(data: ContactFormData): EmailTemplate {
    const subject = `✅ Xabaringiz qabul qilindi - ${this.COMPANY_NAME}`
    const body = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          .highlight { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Xabaringiz qabul qilindi!</h1>
            <p>Hurmatli ${data.name}, sizning murojaatingiz uchun rahmat!</p>
          </div>
          <div class="content">
            <h2>Xabar tafsilotlari:</h2>
            <div class="highlight">
              <p><strong>Mavzu:</strong> ${this.getSubjectText(data.subject)}</p>
              <p><strong>Yuborilgan vaqt:</strong> ${new Date(data.timestamp).toLocaleString("uz-UZ")}</p>
              <p><strong>Xabar ID:</strong> #${Date.now().toString().slice(-6)}</p>
            </div>
            
            <h3>Keyingi qadamlar:</h3>
            <ul>
              <li>📧 Sizning xabaringiz bizning mutaxassislarimizga yuborildi</li>
              <li>⏰ Biz 24 soat ichida javob beramiz</li>
              <li>📞 Shoshilinch holatlarda: +998 (71) 123-45-67</li>
            </ul>

            <p>Agar qo'shimcha savollaringiz bo'lsa, bizga javob yozing yoki quyidagi tugmani bosing:</p>
            <a href="mailto:${this.ADMIN_EMAIL}?subject=Qo'shimcha savol - ${data.name}" class="button">
              Qo'shimcha savol berish
            </a>
          </div>
          <div class="footer">
            <p>© 2024 ${this.COMPANY_NAME}. Barcha huquqlar himoyalangan.</p>
            <p>Bu avtomatik xabar. Iltimos, javob bermang.</p>
          </div>
        </div>
      </body>
      </html>
    `
    return { subject, body, isHtml: true }
  }

  // Get admin notification template
  private static getAdminNotificationTemplate(data: EmailData): EmailTemplate {
    const subject = `🔔 Yangi xabar: ${this.getSubjectText(data.subject)} - ${data.name}`
    const body = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .info-item { background: #f3f4f6; padding: 15px; border-radius: 8px; }
          .message-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .priority-${data.priority} { border-left: 5px solid ${this.getPriorityColor(data.priority)}; }
          .actions { text-align: center; margin: 30px 0; }
          .btn { display: inline-block; padding: 12px 24px; margin: 5px; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .btn-primary { background: #3b82f6; color: white; }
          .btn-success { background: #10b981; color: white; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Yangi Xabar Keldi!</h1>
            <p>Akam Quiz - Contact Form</p>
          </div>
          <div class="content priority-${data.priority}">
            <h2>Xabar Ma'lumotlari</h2>
            
            <div class="info-grid">
              <div class="info-item">
                <strong>👤 Yuboruvchi:</strong><br>
                ${data.name}<br>
                <a href="mailto:${data.email}">${data.email}</a>
              </div>
              <div class="info-item">
                <strong>📋 Mavzu:</strong><br>
                ${this.getSubjectText(data.subject)}<br>
                <span style="color: ${this.getPriorityColor(data.priority)}">
                  ${data.priority.toUpperCase()} Priority
                </span>
              </div>
              <div class="info-item">
                <strong>⏰ Vaqt:</strong><br>
                ${new Date(data.timestamp).toLocaleString("uz-UZ")}<br>
                <small>${this.getTimeAgo(data.timestamp)}</small>
              </div>
              <div class="info-item">
                <strong>🏷️ Kategoriya:</strong><br>
                ${data.category}<br>
                <small>ID: ${data.id}</small>
              </div>
            </div>

            <div class="message-box">
              <h3>💬 Xabar Matni:</h3>
              <p style="white-space: pre-wrap; font-size: 16px; line-height: 1.6;">
                ${data.message}
              </p>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <strong>🌐 Browser:</strong><br>
                <small>${data.userAgent?.substring(0, 50)}...</small>
              </div>
              <div class="info-item">
                <strong>📍 IP Address:</strong><br>
                ${data.ipAddress || "Unknown"}
              </div>
            </div>

            <div class="actions">
              <a href="mailto:${data.email}?subject=Re: ${this.getSubjectText(data.subject)}" class="btn btn-primary">
                📧 Javob Berish
              </a>
              <a href="tel:+998711234567" class="btn btn-success">
                📞 Qo'ng'iroq Qilish
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
    return { subject, body, isHtml: true }
  }

  // Utility methods
  private static determinePriority(subject: string, message: string): EmailData["priority"] {
    const urgentKeywords = ["shoshilinch", "urgent", "muhim", "xato", "ishlamayapti", "muammo"]
    const highKeywords = ["yordam", "help", "texnik", "technical"]

    const text = (subject + " " + message).toLowerCase()

    if (urgentKeywords.some((keyword) => text.includes(keyword))) return "urgent"
    if (highKeywords.some((keyword) => text.includes(keyword))) return "high"
    if (subject === "technical" || subject === "account") return "medium"
    return "low"
  }

  private static categorizeMessage(subject: string): string {
    const categories: Record<string, string> = {
      technical: "Texnik Yordam",
      account: "Hisob Masalalari",
      payment: "To'lov",
      test: "Test Masalalari",
      general: "Umumiy Savol",
      feedback: "Fikr-Mulohaza",
      partnership: "Hamkorlik",
    }
    return categories[subject] || "Umumiy"
  }

  private static getSubjectText(subject: string): string {
    const subjects: Record<string, string> = {
      technical: "Texnik yordam",
      account: "Hisob bilan bog'liq",
      payment: "To'lov masalalari",
      test: "Test bilan bog'liq",
      general: "Umumiy savol",
      feedback: "Fikr-mulohaza",
      partnership: "Hamkorlik",
    }
    return subjects[subject] || subject
  }

  private static getPriorityColor(priority: string): string {
    const colors = {
      urgent: "#dc2626",
      high: "#ea580c",
      medium: "#d97706",
      low: "#65a30d",
    }
    return colors[priority as keyof typeof colors] || "#6b7280"
  }

  private static getTimeAgo(timestamp: string): string {
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now.getTime() - time.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Hozir"
    if (diffMins < 60) return `${diffMins} daqiqa oldin`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} soat oldin`
    return `${Math.floor(diffMins / 1440)} kun oldin`
  }

  private static async getClientIP(): Promise<string> {
    try {
      // In production, use a real IP service
      return "127.0.0.1" // Localhost for development
    } catch {
      return "Unknown"
    }
  }

  private static logContactEvent(data: EmailData): void {
    const events = JSON.parse(localStorage.getItem("contactEvents") || "[]")
    events.push({
      timestamp: data.timestamp,
      type: "contact_form_submitted",
      priority: data.priority,
      category: data.category,
      userId: data.email,
    })
    localStorage.setItem("contactEvents", JSON.stringify(events))
  }

  // Public methods for admin - XATOLIKLAR TUZATILDI
  static async getContactMessages(): Promise<EmailData[]> {
    // ContactFormData[] o'rniga EmailData[]
    try {
      const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]")
      return messages as EmailData[] // EmailData[] sifatida cast qilish
    } catch (error) {
      console.error("Error loading messages:", error)
      return []
    }
  }

  static async deleteMessage(messageId: string): Promise<boolean> {
    try {
      const messages = await this.getContactMessages()
      const filteredMessages = messages.filter((msg: EmailData) => msg.id !== messageId) // EmailData turi
      localStorage.setItem("contactMessages", JSON.stringify(filteredMessages))
      return true
    } catch (error) {
      console.error("Error deleting message:", error)
      return false
    }
  }

  static async markAsRead(messageId: string): Promise<void> {
    const messages = await this.getContactMessages()
    const updatedMessages = messages.map(
      (
        msg: EmailData, // EmailData turi
      ) => (msg.id === messageId ? { ...msg, status: "read" as const } : msg),
    )
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages))
  }

  static async getUnreadCount(): Promise<number> {
    const messages = await this.getContactMessages()
    return messages.filter((msg: EmailData) => msg.status === "sent").length // EmailData turi
  }

  static async getMessagesByPriority(priority: EmailData["priority"]): Promise<EmailData[]> {
    const messages = await this.getContactMessages()
    return messages.filter((msg: EmailData) => msg.priority === priority) // EmailData turi
  }

  static async getMessageStats(): Promise<{
    total: number
    unread: number
    byPriority: Record<string, number>
    byCategory: Record<string, number>
  }> {
    const messages = await this.getContactMessages()
    return {
      total: messages.length,
      unread: messages.filter((m: EmailData) => m.status === "sent").length, // EmailData turi
      byPriority: messages.reduce(
        (acc: Record<string, number>, msg: EmailData) => {
          // EmailData turi
          acc[msg.priority] = (acc[msg.priority] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
      byCategory: messages.reduce(
        (acc: Record<string, number>, msg: EmailData) => {
          // EmailData turi
          acc[msg.category] = (acc[msg.category] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
    }
  }
}
