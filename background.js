// Create the menu item once, when the extension is installed/updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "call-number",
    title: "Call %s",          // %s = the selected text
    contexts: ["selection"]
  });
});

// Fired when the user clicks our menu item
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId !== "call-number") return;

  // Strip everything except digits and leading +
  const number = (info.selectionText || "").replace(/[^\d+]/g, "");
  if (!number) return;

  // Trigger the tel: link (opens the default dialer / softphone)
  chrome.tabs.create({ url: `tel:${number}` });
});
