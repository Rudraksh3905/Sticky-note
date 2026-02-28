document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("box")

    // Create first sticky if you want
    createSticky()

    function createSticky() {
        const block = document.createElement("div")
        block.className = "sticky"

        block.innerHTML = `
            <div class="header">
                <span class="add">＋</span>
                <span class="delete">✖</span>
            </div>
            <div class="content">
                <textarea placeholder="Write something..."></textarea>
                <button class="save-btn">Save</button>
            </div>
            <div class="footer">
                <button class="bold-btn">Bold</button>
                <button class="italic-btn">Italic</button>
            </div>
        `

        box.appendChild(block)

        // === ELEMENTS ===
        const addBtn = block.querySelector(".add")
        const deleteBtn = block.querySelector(".delete")
        const saveBtn = block.querySelector(".save-btn")
        const boldBtn = block.querySelector(".bold-btn")
        const italicBtn = block.querySelector(".italic-btn")

        // === EVENTS ===

        // Create new sticky
        addBtn.addEventListener("click", createSticky)

        // Delete sticky
        deleteBtn.addEventListener("click", () => {
            block.remove()
        })

        // Save / Edit toggle
        saveBtn.addEventListener("click", () => {
            const textarea = block.querySelector("textarea")
            const paragraph = block.querySelector("p")

            // If textarea exists → Save
            if (textarea) {
                const p = document.createElement("p")
                p.textContent = textarea.value
                p.style.margin = "0"

                block.querySelector(".content").replaceChild(p, textarea)
                saveBtn.textContent = "Edit"
            } 
            // If paragraph exists → Edit
            else if (paragraph) {
                const ta = document.createElement("textarea")
                ta.value = paragraph.textContent

                block.querySelector(".content").replaceChild(ta, paragraph)
                saveBtn.textContent = "Save"
            }
        })

        // Format Function
        function format(type) {
            const element =
                block.querySelector("textarea") ||
                block.querySelector("p")

            if (!element) return

            if (type === "bold") {
                element.style.fontWeight =
                    element.style.fontWeight === "bold"
                        ? "normal"
                        : "bold"
            }

            if (type === "italic") {
                element.style.fontStyle =
                    element.style.fontStyle === "italic"
                        ? "normal"
                        : "italic"
            }
        }

        boldBtn.addEventListener("click", () => format("bold"))
        italicBtn.addEventListener("click", () => format("italic"))
    }
})
