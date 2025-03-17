
(function() {
  // ==============================
  // 1. PLUGIN CONFIGURATION
  // ==============================
  const pluginCode = 'XYZ';

  const pluginConfig = {
    containerId: 'container',
    
    nodeButtonText: 'Custom Button',
    nodeButtonClass: 'custom-button btn btn-primary btn-sm',
    nodeButtonStyle: 'margin-top: 5px;',
    nodeButtonIdPrefix: 'PluginNodeBtn-',

    settingsButtonId: pluginCode + 'PluginSettingsButton',
    settingsButtonText: 'Settings',
    settingsButtonClass: 'btn btn-secondary',
    settingsButtonStyle: 'margin-left: 10px;',

    settingsModalId: pluginCode + 'PluginSettingsModal',
    settingsModalTitle: 'Settings',
    settingsSaveButtonText: 'Save changes',
    settingsCloseButtonText: 'Close',

    nodeModalId: pluginCode + 'PluginNodeModal',
    nodeModalCloseButtonText: 'Close',
  };

  // ==============================
  // 2. PLUGIN INITIALIZATION
  // ==============================
  function initializePlugin(config) {
    // 2a. Add the "Settings" button
    addSettingsButton(config);

    // 2b. Add buttons to existing .node-content elements
    const nodes = document.querySelectorAll('.node-content');
    nodes.forEach(node => addButtonToNode(node, config));

    // 2c. Set up a MutationObserver to watch for newly added .node-content
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(`Container with ID "${config.containerId}" not found!`);
      return;
    }

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.classList && node.classList.contains('node-content')) {
            addButtonToNode(node, config);
          }
        });
      });
    });

    observer.observe(container, { childList: true, subtree: true });
  }

  // ==============================
  // 3. ADD BUTTON TO NODE
  // ==============================
  function addButtonToNode(node, config) {
    // Avoid adding the button multiple times
    if (node.querySelector('.custom-button')) return;

    const nodeId = node.getAttribute('data-id');
    const nodeTitleEl = node.querySelector('.node-title');
    if (!nodeTitleEl) return;

    const nodeName = nodeTitleEl.textContent.trim();

    // Our plugin expects a popout panel to already exist inside .node-content
    const popoutPanel = node.querySelector('.popout-panel');
    if (!popoutPanel) return;

    // Create the custom button
    const customButton = document.createElement('button');
    customButton.id = config.nodeButtonIdPrefix + nodeId;
    customButton.textContent = config.nodeButtonText;
    customButton.className = config.nodeButtonClass;

    // Optional inline styles
    if (config.nodeButtonStyle) {
      customButton.style = config.nodeButtonStyle;
    }

    // Append the button to the existing popout panel
    popoutPanel.appendChild(customButton);

    // When clicked, open a node-specific modal
    customButton.addEventListener('click', () => {
      openNodeModal(nodeId, nodeName, config);
    });
  }

  // ==============================
  // 4. ADD SETTINGS BUTTON
  // ==============================
  function addSettingsButton(config) {
    if (document.getElementById(config.settingsButtonId)) return;

    const settingsButton = document.createElement('button');
    settingsButton.id = config.settingsButtonId;
    settingsButton.textContent = config.settingsButtonText;
    settingsButton.className = config.settingsButtonClass;

    if (config.settingsButtonStyle) {
      settingsButton.style = config.settingsButtonStyle;
    }

    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
      tabsContainer.appendChild(settingsButton);
    } else {
      console.error('Tabs container not found!');
    }

    // Add event listener to open the Settings modal
    settingsButton.addEventListener('click', () => openSettingsModal(config));
  }

  // ==============================
  // 5. OPEN SETTINGS MODAL
  // ==============================
  function openSettingsModal(config) {
    const existingModal = document.getElementById(config.settingsModalId);
    if (existingModal) existingModal.remove();

    const modalHTML = `
      <div class="modal fade" id="${config.settingsModalId}" tabindex="-1" aria-labelledby="${config.settingsModalId}Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="${config.settingsModalId}Label">${config.settingsModalTitle}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
               <!-- Your settings form or content goes here -->
               <p>Settings content goes here...</p>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${config.settingsCloseButtonText}</button>
               <button type="button" class="btn btn-primary">${config.settingsSaveButtonText}</button>
             </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const settingsModalEl = document.getElementById(config.settingsModalId);
    const settingsModal = new bootstrap.Modal(settingsModalEl);
    settingsModal.show();
  }

  // ==============================
  // 6. OPEN NODE MODAL
  // ==============================
  function openNodeModal(nodeId, nodeName, config) {
    const existingModal = document.getElementById(config.nodeModalId);
    if (existingModal) existingModal.remove();

    const modalHTML = `
      <div class="modal fade" id="${config.nodeModalId}" tabindex="-1" aria-labelledby="${config.nodeModalId}Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="${config.nodeModalId}Label">Node: ${nodeName}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="modal-body">
               <!-- Content for node goes here -->
               <p>Node ID: ${nodeId}</p>
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${config.nodeModalCloseButtonText}</button>
             </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const nodeModalEl = document.getElementById(config.nodeModalId);
    const nodeModal = new bootstrap.Modal(nodeModalEl);
    nodeModal.show();
  }

  // ==============================
  // 7. EXECUTE THIS PLUGIN
  // ==============================
  initializePlugin(pluginConfig);
})();

